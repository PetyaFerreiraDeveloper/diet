import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ results }) {
  console.log(results);

  return (
    <>
      <Head>
        <title>Dietary App</title>
        <meta name="description" content="App testing api" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="my-10">New dietary app</h1>

        <div className="flex items-center gap-2 mb-10">
          <label for="search-food">Search for food</label>
          <input type="text" id="search-food" placeholder="search" className="px-2" />
        </div>
        {results &&
          results.foods.map((food) => (
            <section key={food.fdcId}>
              <h2>{food.description}</h2>

              <ul>
                {food.foodNutrients
                  .filter(
                    (nutrient) =>
                      nutrient.nutrientId === 1003 ||
                      nutrient.nutrientId === 1005 ||
                      nutrient.nutrientId === 1004
                  )
                  .map((nutrient) => (
                    <li key={nutrient.foodNutrientId}>
                      {nutrient.nutrientName}: {nutrient.value}g :{" "}
                      {nutrient.foodNutrientId}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  console.log("Hello from the server");
  const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query.term}&api_key=${process.env.API_KEY}`;

  const res = await fetch(baseUrl);
  const data = await res.json();

  return {
    props: {
      results: data,
    },
  };
}
