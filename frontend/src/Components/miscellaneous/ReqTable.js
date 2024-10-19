import { Box } from '@chakra-ui/react'
import React from 'react'
import MyRequest from './MyRequest'
import ReqEntries from './ReqEntries'
import { ReqState } from '../../Context/requestProvider'

const ReqTable = ({content}) => {
    const { requestExists} = ReqState();

  return (
      <Box className="workarea">

        {requestExists && content === "renderEntries" ? <ReqEntries/> : <MyRequest/>}
        {/* <ReqEntries/>
        <MyRequest/> */}
      </Box>
  )
}

export default ReqTable
