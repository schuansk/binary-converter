import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';
import Head from 'next/head';
import React from 'react';
import { TbArrowsExchange } from 'react-icons/tb';

type ConvertOptions = 'decimalToBinary' | 'binaryToDecimal';

export default function Home() {
  const decimalRef = React.useRef<HTMLTextAreaElement>(null);
  const binaryRef = React.useRef<HTMLTextAreaElement>(null);

  const [convertOption, setConvertOption] =
    React.useState<ConvertOptions>('decimalToBinary');
  const [decimal, setDecimal] = React.useState('');
  const [binary, setBinary] = React.useState('');

  const handleConvert = () => {
    switch (convertOption) {
      case 'decimalToBinary':
        const value = Number(decimal);
        if (isNaN(value)) return;
        setBinary(decimalToBinary(value));
        break;
      case 'binaryToDecimal':
        if (!isBinary(binary)) return;
        setDecimal(binaryToDecimal(binary));
        break;
      default:
        break;
    }
  };

  const toggleConversionOrder = async () => {
    if (convertOption === 'binaryToDecimal') {
      setConvertOption('decimalToBinary');
      await sleep();
      decimalRef.current?.focus();
    } else {
      setConvertOption('binaryToDecimal');
      await sleep();
      binaryRef.current?.focus();
    }
  };

  const decimalToBinary = (input: number): string => {
    let binary = '';
    while (input > 0) {
      const division = input / 2;
      const rest_of_division = input % 2;
      input = Math.floor(division);
      binary = rest_of_division + binary;
    }
    return binary;
  };

  const binaryToDecimal = (input: string): string => {
    const binaryToArray = input.split('').map(Number).reverse();
    const decimal = binaryToArray.reduce((accumulator, currentValue, index) => {
      return currentValue * Math.pow(2, index) + accumulator;
    }, 0);
    return String(decimal);
  };

  const isBinary = (input: string): boolean => {
    const binaryRegex = /^[01]+$/;
    return binaryRegex.test(input);
  };

  const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, 100));
  };

  React.useEffect(() => {
    decimalRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Head>
        <title>Decimal and Binary Converter</title>
        <meta
          name="description"
          content="A free online tool for converting decimal numbers to binary and vice versa."
        />
        <meta
          name="keywords"
          content="Decimal, Binary, Converter, Online Tool"
        />
        <meta name="og:title" content="Decimal and Binary Converter" />
        <meta
          name="og:description"
          content="A free online tool for converting decimal numbers to binary and vice versa."
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="w-full h-auto lg:w-50vw lg:h-60vh flex flex-col items-center space-y-4 justify-start lg:justify-evenly bg-white shadow-lg lg:rounded-lg border-t-10 border-blue-500 pb-4 lg:pb-0">
        <div className="px-4 py-2 mt-20 lg:mt-0">
          <h2 className=" flex items-center text-gray-800 text-3xl xl:text-5xl font-semibold">
            Convert Decimal
            <span className="text-blue-500">
              <TbArrowsExchange />
            </span>
            Binary
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center space-x-4 px-4 w-full">
          <Textarea
            active={convertOption === 'decimalToBinary'}
            title="Decimal"
            value={decimal}
            textToClipboard={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            ref={decimalRef}
          />
          <Button onClick={toggleConversionOrder} className="mt-5">
            <TbArrowsExchange size={36} />
          </Button>
          <Textarea
            active={convertOption === 'binaryToDecimal'}
            title="Binary"
            value={binary}
            textToClipboard={binary}
            onChange={(e) => setBinary(e.target.value)}
            ref={binaryRef}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={handleConvert}>CONVERT</Button>
        </div>
      </div>
    </div>
  );
}
