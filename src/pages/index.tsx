import Layout from '@components/Layout';
import React from 'react';
import Carousel from '@components/home/Carousel/Carousel';
import RecentProduct from '@components/home/RecentProduct';
import { Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Models, Services } from 'utilities-techsweave';
import { ConditionExpression } from '@aws/dynamodb-expressions';

const indexPage = (prop) => {
  const { products, lessProducts } = prop;
  return (
    <Layout title="EmporioLambda">
      <Box w='95%'>
        <Carousel product={products} />
        <RecentProduct product={lessProducts} />
      </Box>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  let products: Models.Tables.IProduct[] = [];
  let lessProducts: Models.Tables.IProduct[] = [];

  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);

  const filter: ConditionExpression = {
    type: 'NotEquals',
    subject: 'discount',
    object: 0,
  };
  try {
    products = (await caller.scanAsync(6, undefined, undefined, undefined, filter)).data;
  } catch (error) {
    console.log(error);
  }
  const filter2: ConditionExpression = {
    type: 'LessThanOrEqualTo',
    subject: 'availabilityQta',
    object: 10,
  };
  try {
    lessProducts = (await caller.scanAsync(6, undefined, undefined, undefined, filter2)).data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      products,
      lessProducts,
    },
    revalidate: 600,
  };
};
export default indexPage;
