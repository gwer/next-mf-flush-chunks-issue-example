import React, { lazy } from 'react';
import MyCompInt from '../components/MyCompInt';

// eslint-disable-next-line
// @ts-ignore
// import MyComp from 'mf/MyComp';
const MyComp = lazy(() => import('mf/MyComp'));

// import dynamic from 'next/dynamic';
// // @ts-ignore
// const MyComp = dynamic(() => import('mf/MyComp'), { suspense: true });

const Test = () => {
  return (
    <>
      <p>Hello world</p>
      <MyCompInt />
      <MyComp />
    </>
  );
};

export default Test;

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
