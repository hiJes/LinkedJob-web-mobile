import { useEffect, useState } from "react"
import { baseUrl } from "../helpers/constant"

export default function useFetch(url){
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = () => {
    fetch( baseUrl() + "/" + url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(">>>>", data);
        setData (data)
      })
      .catch((err) => console.log(err))
      .finally(()=> setIsLoading(false))
  }

  useEffect(()=> {
    fetchData()
  }, [])

  return {
    data, isLoading
  }
}