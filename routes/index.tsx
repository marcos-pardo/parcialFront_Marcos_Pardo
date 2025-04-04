
import { Handlers, FreshContext, PageProps } from "$fresh/server.ts"
import Axios from "axios"

type apiPhone = {

country: string | null
}

export const handler: Handlers <apiPhone> ={
  async GET(req, ctx) {
    return await ctx.render({
     
      country: null,
    });
  },
  async POST(req,ctx: FreshContext<unknown,apiPhone>) {
    try {
      const form = await req.formData();
      const telefono = form.get ("phone")?.toString()
      //console.log(telefono)
      const API_KEY = Deno.env.get("API_KEY")
      if(!API_KEY) return new Response ("no hay Api Key", {status:500})
  
        const url = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`
  
        const response = await Axios.get<apiPhone>(url, {headers: {
              "X-Api-Key": API_KEY
            }})

            console.log(response.data.country)
  
            return ctx.render({
              
              country:response.data.country
  
            });
    } catch (error) {
      return new Response ( null, {
        status:300
      })
      
    }
    

  }
}


export default function Home(props: PageProps<apiPhone>) {

  const {country} = props.data
  return (
    <>
      <form method="post">
        <input type="text" name="phone"/>
        <button type="submit">BUSCAR</button>
        
        
      </form>
      
      {country ? <a href={`/country/${country}`}> {country}</a>:null}

    </>
  )
}
