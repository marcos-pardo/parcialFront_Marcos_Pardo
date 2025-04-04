
import { Handlers, FreshContext, PageProps } from "$fresh/server.ts"
import Axios from "axios"

type apiCity = {
name:string
country: string,

}
type array = apiCity[]

export const handler: Handlers <apiCity> ={
  
  async GET(req: Request,ctx: FreshContext<unknown,apiCity>) {
    try {
        const {la_ciudad} = ctx.params
      
      const API_KEY = Deno.env.get("API_KEY")
      if(!API_KEY) return new Response ("no hay Api Key", {status:500})
  
        const url = `https://api.api-ninjas.com/v1/city?name=${la_ciudad}`
        console.log(url)
  
        const response = await Axios.get<array>(url, {headers: {
              "X-Api-Key": API_KEY
            }})

            
  
            return ctx.render({
              
              name:response.data[0].name,
              country:response.data[0].country
  
            });
    } catch (error) {
      return new Response ( null, {
        status:300
      })
      
    }
    

  }
}
const Page = (props: PageProps<apiCity>) =>{
    return(
        <div>
            <h1>{props.data.name}</h1>
            <a href={`/country/${props.data.country}`}>{props.data.country}</a>
        </div>
    )
}

export default Page