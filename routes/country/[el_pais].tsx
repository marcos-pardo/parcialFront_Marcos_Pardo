
import { Handlers, FreshContext, PageProps } from "$fresh/server.ts"
import Axios from "axios"

type apiCountry = {
name:string
capital: string,

}
type array = apiCountry[]

export const handler: Handlers <apiCountry> ={
  
  async GET(req: Request,ctx: FreshContext<unknown,apiCountry>) {
    try {
        const {el_pais} = ctx.params
      //console.log(telefono)
      const API_KEY = Deno.env.get("API_KEY")
      if(!API_KEY) return new Response ("no hay Api Key", {status:500})
  
        const url = `https://api.api-ninjas.com/v1/country?name=${el_pais}`
        console.log(url)
  
        const response = await Axios.get<array>(url, {headers: {
              "X-Api-Key": API_KEY
            }})

            console.log(response.data[0].capital)
  
            return ctx.render({
              
              name:response.data[0].name,
              capital:response.data[0].capital
  
            });
    } catch (error) {
      return new Response ( null, {
        status:300
      })
      
    }
    
  }
}
const Page = (props: PageProps<apiCountry>) =>{
    return(
        <div>
        <h1>{props.data.name}</h1>
<a href={`/city/${props.data.capital}`}>{props.data.capital}</a>
        </div>
    )
}

export default Page


