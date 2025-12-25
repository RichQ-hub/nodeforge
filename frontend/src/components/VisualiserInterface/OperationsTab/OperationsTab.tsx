'use client';

import ContentBox from '../ContentBox';
import { motion } from 'framer-motion';

import optionsIcon from '@/assets/options.svg';
import codeIcon from '@/assets/code.svg';
import { barlow } from '@/lib/fonts';

import playIcon from '@/assets/play.svg';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import SelectOperationBtn from './SelectOperationBtn';
import { listItemVariants, listVariants } from '@/lib/framerVariants';
import VisualiserContext from '@/context/VisualiserContext';
import { Tooltip } from 'react-tooltip';

const OperationsTab = () => {
  const { controller } = useContext(VisualiserContext);
  const [selectedOperation, setSelectedOperation] = useState<string>(
    controller.dataStructure.getOperations()[0]
  );
  const [inputs, setInputs] = useState<number[]>([]);

  useEffect(() => {
    controller.selectOperation(selectedOperation);
    setInputs(
      Array(controller.dataStructure.getOperationDetails(selectedOperation)?.args.length || 0).fill(0)
    );
    console.log(`ArgLength = ${inputs.length}`);
  }, [selectedOperation]);

  const clearInputs = () => {
    const newInputs = inputs.slice();
    newInputs.fill(0);
    setInputs(newInputs);
  }

  const executeOperation = () => {
    // TODO: Should return an error.
    controller.runOperation(selectedOperation, ...inputs);
    clearInputs();
  }

  return (
    <motion.div
      variants={listVariants}
      initial='closed'
      animate='open'
    >
      {/* Select Algorithm Section */}
      <motion.div
        className={`${barlow.className} h-10 mb-6 flex`}
        variants={listItemVariants}
      >
        {/* Select Algorithm Box*/}
        <div className='grow flex items-center overflow-hidden bg-nodeforge-box-bg rounded-bl-2xl rounded-tl-2xl border border-r-0 border-white/15'>
          {/* Icon */}
          <div className='p-2 bg-nodeforge-aqua w-10 rounded-br-2xl shrink-0'>
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M406.162286 94.061714l12.653714 65.316572a365.933714 365.933714 0 0 0-267.264 501.540571l-61.220571 25.892572a432.420571 432.420571 0 0 1 315.830857-592.749715z m-193.828572 757.028572l42.569143-51.2a364.105143 364.105143 0 0 0 233.764572 84.48c87.771429 0 170.642286-31.012571 236.251428-86.528l43.008 50.761143A430.665143 430.665143 0 0 1 488.594286 950.857143a430.665143 430.665143 0 0 1-276.260572-99.766857z m426.422857-666.331429a135.68 135.68 0 1 1 7.753143-68.754286 432.713143 432.713143 0 0 1 268.873143 332.8c1.462857 9.069714 2.706286 21.065143 3.803429 35.986286a31.451429 31.451429 0 0 1-31.451429 33.718857 34.889143 34.889143 0 0 1-34.816-32.329143 366.153143 366.153143 0 0 0-214.162286-301.348571z m-126.464 29.403429a78.555429 78.555429 0 1 0 0-157.037715 78.555429 78.555429 0 0 0 0 157.037715z m-320.658285 672.914285a135.68 135.68 0 1 1 0-271.286857 135.68 135.68 0 0 1 0 271.36z m0-57.051428a78.555429 78.555429 0 1 0 0-157.110857 78.555429 78.555429 0 0 0 0 157.110857z m640.731428 57.051428a135.68 135.68 0 1 1 0-271.286857 135.68 135.68 0 0 1 0 271.36z m0-57.051428a78.555429 78.555429 0 1 0 0-157.110857 78.555429 78.555429 0 0 0 0 157.110857z" fill="#000" /></svg>
          </div>
          {/* Title */}
          <div className='px-3 py-2 flex items-center font-bold'>
            <h2 className='text-nodeforge-aqua mr-2'>Action:</h2>
            <p>{selectedOperation}</p>
          </div>
        </div>

        <SelectOperationBtn setSelectedOperation={setSelectedOperation} />

        {/* Play Algorithm Button */}
        <motion.button
          data-tooltip-id='play-algo'
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          className='ml-4 rounded-3xl border border-white/15 bg-nodeforge-brand p-3 cursor-pointer'
          type='button'
          onClick={() => {
            executeOperation();
          }}
        >
          <Image className='h-full w-full' src={playIcon} alt='' />
        </motion.button>
        <Tooltip id='play-algo' content='Play Operation' place='top' />
      </motion.div>

      {/* Operation Inputs Menu */}
      <ContentBox title='Values' icon={optionsIcon}>
        <div className='grid grid-cols-[minmax(100px,max-content)_1fr] gap-3 items-center auto-rows-max'>
          {inputs.length && controller.dataStructure.getOperationDetails(selectedOperation)?.args.map((arg, idx) => {
            return (
              <React.Fragment key={idx}>
                <label htmlFor={arg.name}>{arg.name}</label>
                <input
                  className='w-full h-8 bg-[rgba(110,129,224,0.3)] border border-nodeforge-white-10 px-2 ml-auto outline-none font-normal'
                  type={arg.inputType}
                  id={arg.name}
                  placeholder={arg.placeholder}
                  value={inputs[idx]}
                  onChange={(e) => {
                    e.preventDefault();
                    setInputs(prev => {
                      const newInputs = prev.slice();
                      newInputs[idx] = Number(e.target.value);
                      return newInputs;
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      executeOperation();
                    }
                  }}
                />
              </React.Fragment>
            )
          })}
        </div>
      </ContentBox>

      {/* Code Snippet */}
      <ContentBox title='Code Snippet' icon={codeIcon}>
        {/* <pre id='code-canvas' className={`${jetbrains.className} text-xs/loose overflow-x-scroll scrollbar`}>{sampleCodeSnippet}</pre> */}
        <div className='overflow-x-scroll scrollbar'>
          <svg id='code-canvas'></svg>
        </div>
      </ContentBox>
    </motion.div>
  )
}

export default OperationsTab