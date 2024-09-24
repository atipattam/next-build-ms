import { client } from "@/lib/serverAppInsight";
import axios from "axios";

export const getSomething = async () => {
  console.log("first");

  let allData = {};
  let err = null;
  try {
    const response = await axios.get(
      `http://localhost:8000/arise-career-api/v1/career-name/${title}`
    );
    console.log(response)
    if (response.status === 200) {
      allData = _get(response, "data.data");
    }
  } catch (error) {
    // console.log(error)
    err = {
      message: error?.message,
      status: error?.status,
      name: "get career role name",
      code: error?.code,
    };
    // client.trackException({
    //   exception: error,
    //   properties: {
    //     name: err.name,
    //     messsage: err.message || '-',
    //     code: err.code || '-',
    //     object: {name : 'eoeo', test:"eiei"} // Custom property: Component where error occurred
    //   },
    // });
  }

  return { allData, err };
};
