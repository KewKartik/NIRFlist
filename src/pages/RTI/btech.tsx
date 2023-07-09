/* eslint-disable */
"use client"
import Head from "next/head";
import _app from "@/src/pages/_app"
import { BTechRTI } from '.prisma/client'
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/global/data-tableRTI';
import prisma from '@/lib/prisma';
import { columns }  from "@/components/datatable/rtibtech"

export default function DemoPage({ products }: { products: any[] }) {
  const [data, setData] = useState<BTechRTI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await products;
      setData(result);
    };

    fetchData();
  }, [products]);

  return (
    <>
    <Head>
      <title>Nirf Tierlist for BTECH (Engineering) Colleges</title>
      <meta name="description" content="Access a comprehensive repository of essential information to discern your ideal academic institution, conveniently consolidated in a singular location." />
      <link rel="icon" href="/favicol.ico" />
    </Head>
    <div className="container mx-auto py-10">
      <h1 className="mx-auto max-w-7xl scroll-m-20 text-xl font-bold tracking-tight lg:text-xl">
        RTI data of Engineering Colleges
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
      <hr/>
      <h3 className="mx-auto max-w-7xl py-10 px-4 text-center scroll-m-20 text-xl font-bold tracking-tight lg:text-xl">
        Complete credits to <a className="transition hover:text-gray-600/75" href="https://www.reddit.com/user/OkNerve7447/">u/OkNerve7447</a>, for filing the RTIs
      </h3>
    </>
  );
}


export async function getServerSideProps(context: any) {
  const data = await prisma.bTechRTI.findMany({
    include: {
      category: true,
    },
  });

  const products = data.map((product) => ({
    ...product,
  }));

  return {
    props: { products },
  };
}