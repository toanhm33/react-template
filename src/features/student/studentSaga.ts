import { call, take, delay, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fork } from "redux-saga/effects";
import { studentActions } from "./studentSlice";
import { push } from "connected-react-router";

function* fetchStudent(payload: any) {
  console.log('fetch', payload);
  try {
    yield put(push('/admin/dashboard'));
  } catch (error) {
  }
}

export default function* studentSaga() {
  const action: PayloadAction<any> = yield take(studentActions.fetch.type);
  yield fork(fetchStudent, action.payload);
}