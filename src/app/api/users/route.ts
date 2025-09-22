import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - Fetch all customers with orders
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("customer_order")
      .select(
        `
        *,
        customers (*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch customers with orders" },
      { status: 500 }
    );
  }
}

// POST - Create new customer and order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      number,
      address,
      kameez_length,
      salwar_length,
      suit_style,
      bazo_length,
      neck_size,
      chest,
      waist,
      shoulder,
      asteen,
      collarstyle,
      bottomwidth,
      salwartype,
      color,
      payment,
      totalBill,
      basicPrice,
      delivery,
      clothsquantity,
      delivery_date,
    } = body;

    let status: "pending" | "complete" = "pending";
    if (delivery_date && new Date(delivery_date) < new Date()) {
      status = "complete";
    }

    const requiredFields = [
      "name",
      "number",
      "address",
      "kameez_length",
      "neck_size",
      "bazo_length",
      "salwar_length",
      "suit_style",
      "chest",
      "waist",
      "shoulder",
      "asteen",
      "collarstyle",
      "bottomwidth",
      "salwartype",
      "color",
      "payment",
      "clothsquantity",
      "totalBill",
      "basicPrice",
      "delivery",
      "delivery_date",
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing or invalid required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if customer exists
    const { data: existingCustomer, error: customerError } = await supabase
      .from("customers")
      .select("customers_id")
      .eq("number", number)
      .single();

    let customers_id: number;

    if (customerError && customerError.code !== "PGRST116") {
      // PGRST116 is "not found" error
      throw customerError;
    }

    if (existingCustomer) {
      customers_id = existingCustomer.customers_id;
    } else {
      // Insert new customer
      const { data: newCustomer, error: insertError } = await supabase
        .from("customers")
        .insert([{ name, number, address, is_deleted: false }])
        .select("customers_id")
        .single();

      if (insertError) throw insertError;
      customers_id = newCustomer.customers_id;
    }

    // Insert new order
    const { data: newOrder, error: orderError } = await supabase
      .from("customer_order")
      .insert([
        {
          customers_id,
          kameez_length,
          salwar_length,
          suit_style,
          bazo_length,
          neck_size,
          chest,
          waist,
          shoulder,
          asteen,
          collarstyle,
          bottomwidth,
          salwartype,
          color,
          payment,
          clothsquantity,
          totalBill,
          basicPrice,
          delivery,
          delivery_date,
          status,
          is_deleted: false,
        },
      ])
      .select(
        `
        *,
        customers (*)
      `
      )
      .single();

    if (orderError) throw orderError;

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update customer and order
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.order_id && !body.customers_id) {
      return NextResponse.json(
        { error: "Missing order_id or customers_id" },
        { status: 400 }
      );
    }

    // Update status based on delivery date
    if (body.delivery_date) {
      if (new Date(body.delivery_date) < new Date()) {
        body.status = "complete";
      } else {
        body.status = "pending";
      }
    }

    // Update order if order_id is provided
    if (body.order_id) {
      const orderFields = [
        "kameez_length",
        "salwar_length",
        "suit_style",
        "bazo_length",
        "neck_size",
        "chest",
        "waist",
        "shoulder",
        "asteen",
        "collarstyle",
        "bottomwidth",
        "salwartype",
        "color",
        "payment",
        "clothsquantity",
        "totalBill",
        "basicPrice",
        "delivery",
        "delivery_date",
        "status",
        "is_deleted",
      ];

      const orderUpdates: any = {};
      for (const field of orderFields) {
        if (body[field] !== undefined) {
          orderUpdates[field] = body[field];
        }
      }

      if (Object.keys(orderUpdates).length > 0) {
        const { error: orderError } = await supabase
          .from("customer_order")
          .update(orderUpdates)
          .eq("order_id", body.order_id);

        if (orderError) throw orderError;
      }
    }

    // Update customer if customers_id is provided
    if (
      body.customers_id &&
      (body.name !== undefined ||
        body.number !== undefined ||
        body.address !== undefined)
    ) {
      const customerUpdates: any = {};
      if (body.name !== undefined) customerUpdates.name = body.name;
      if (body.number !== undefined) customerUpdates.number = body.number;
      if (body.address !== undefined) customerUpdates.address = body.address;

      const { error: customerError } = await supabase
        .from("customers")
        .update(customerUpdates)
        .eq("customers_id", body.customers_id);

      if (customerError) throw customerError;
    }

    // Fetch updated record
    const { data: updatedRecord, error: fetchError } = await supabase
      .from("customer_order")
      .select(
        `
        *,
        customers (*)
      `
      )
      .eq("order_id", body.order_id)
      .single();

    if (fetchError) throw fetchError;

    return NextResponse.json(updatedRecord, { status: 200 });
  } catch (error: any) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update the customer/order" },
      { status: 500 }
    );
  }
}

// DELETE - Remove an order
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("customer_order")
      .delete()
      .eq("order_id", id);

    if (error) throw error;

    return NextResponse.json(
      { message: "Customer order deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete the customer order" },
      { status: 500 }
    );
  }
}
