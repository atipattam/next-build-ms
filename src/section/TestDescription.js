'use client'

import Link from "next/link";
import React from "react";

function TestDescription(props) {
  const { data,slug } = props;
  return (
    <div>
      Description :
      <Link prefetch={false} href={`/career/${slug}-form`}>{data}</Link>   
       </div>
  );
}

export default TestDescription;
