export default (time: number) => {
  const date = new Date(time);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日
  ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
};
