import studentApi from "api/studentApi";
import { Student } from "models";
import { useQuery } from "react-query";

export const useStudents = (getPageNumber: number, onSuccess: Function, onError: Function) => {
    return useQuery<Student[], Error>(
        "query-tutorials",
        () => {
            return studentApi.findAll({
            _page: getPageNumber,
            _limit: 10,
            });
        },
        {
            enabled: false,
            retry: false,
            onSuccess: (res) => {
                onSuccess(res);
            },
            onError: (err: any) => {
                onError();
            },
        }
    );
}