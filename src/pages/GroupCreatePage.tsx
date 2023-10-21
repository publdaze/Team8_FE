import React, { useState } from 'react';
import { Button, Step, Stepper } from '@material-tailwind/react';
import GroupCreateNameSection from '@components/GroupCreate/GroupCreateNameSection';
import GroupCreatePhotoSection from '@components/GroupCreate/GroupCreatePhotoSection';
import GroupCreateNickNameSection from '@components/GroupCreate/GroupCreateNickNameSection';
import GroupCreateCompleteSection from '@components/GroupCreate/GroupCreateCompleteSection';
import GroupCreateSearchSetting from '@components/GroupCreate/GroupCreateSearchSetting';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const GroupCreatePage = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [groupInfo, setGroupInfo] = useState({
    groupName: '',
    groupImage: '',
    groupNickname: '',
    introduction: '',
    entranceHint: '',
    entrancePassword: '',
  });

  const groupCreateSections = {
    1: (
      <GroupCreateNameSection
        onNextStep={() => setCurrentStep(2)}
        groupName={groupInfo.groupName}
        setGroupInfo={(value) => setGroupInfo((prev) => ({ ...prev, ...value }))}
      />
    ),
    2: <GroupCreatePhotoSection onNextStep={() => setCurrentStep(3)} />,
    3: <GroupCreateSearchSetting onNextStep={() => setCurrentStep(4)} />,
    4: <GroupCreateNickNameSection onNextStep={() => setCurrentStep(5)} />,
    5: <GroupCreateCompleteSection groupName={groupInfo.groupName} />,
  };

  return (
    <div className='flex flex-col pt-10 max-w-xl mx-auto mb-20 min-h-[500px]'>
      <Button
        variant='text'
        className='p-0 mb-2 max-w-fit text-gray-500'
        onClick={() => setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4 | 5)}
      >
        <div className='flex gap-0 items-center max-h-fit'>
          <MdKeyboardArrowLeft size={15} />
          <span className='text-xs pr-2'>이전 단계로</span>
        </div>
      </Button>
      <Stepper className='w-40 mb-14 cursor-pointer' activeStep={currentStep - 1}>
        {Object.keys(groupCreateSections).map((step) => (
          <Step
            key={step}
            className='w-6 h-6 text-xs bg-gray-100'
            onClick={() => setCurrentStep(parseInt(step, 10) as 1 | 2 | 3 | 4 | 5)}
          >
            {step}
          </Step>
        ))}
      </Stepper>
      {groupCreateSections[currentStep]}
    </div>
  );
};

export default GroupCreatePage;
