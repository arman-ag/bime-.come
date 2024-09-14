const getData = async (page: number): Promise<SingleDataResponseType[]> => {
  const rawRes = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_start=${page}&_limit=5`
  );
  const res = rawRes.json();
  return res;
};
export { getData };
