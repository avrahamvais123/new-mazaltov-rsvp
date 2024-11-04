export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productName = searchParams.get("name");

  try {
    const response = await axios.get(
      "https://hazmanot-mazaltov.com/wp-json/wc/v3/products",
      {
        auth: {
          username: process.env.WC_CONSUMER_KEY,
          password: process.env.WC_CONSUMER_SECRET,
        },
        params: productName ? { search: productName } : {},
      }
    );

    const products = response.data;

    if (productName && products.length > 0) {
      const product = products[0];
      return new Response(
        JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else if (productName && products.length === 0) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products from WooCommerce:", error);
    return new Response(JSON.stringify({ error: "Failed to load products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
