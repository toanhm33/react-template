import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";

export function* log(action: PayloadAction) {
  console.log('log', action);
}
function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('increment saga');
  // wait 2s
  yield delay(2000);
  console.log('waiting dispatch action');

  // dispatch action success
  yield put(incrementSagaSuccess(action.payload))
  
}

export default function* counterSaga() {
  console.log('counter');
  // yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}