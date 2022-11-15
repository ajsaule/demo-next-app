import { useRouter } from 'next/router'

import Head from 'next/head'

export default function Car({ car }) {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>{`${car.color} ${car.id}`}</title>
      </Head>
      <h1>Hello {id}</h1>
      <img src={car.image} />
    </>
  )
}

// Does the exact same thing as getStaticProps, but instead of doing it at build time, it does it on every request
export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`)
  const data = await req.json()

  return {
    props: { car: data },
  }
}

// /* when the site gets built next will automatically call this function,
//  then send the result as props to the component itself */
// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`)
//   // why do we convert fetch requests to json?
//   const data = await req.json()

//   return {
//     props: { car: data },
//   }
// }

// // because we are working with a dynamic route, there's one other thing we have to keep in mind...
// // That is the fact that Next does not know how many pages we have associated to a dynamic route.
// // Next needs to know which dynamic pages to render.
// export async function getStaticPaths() {
//   const req = await fetch('http://localhost:3000/cars.json')
//   const data = await req.json()

//   const paths = data.map((car) => {
//     return { params: { id: car } }
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// }
