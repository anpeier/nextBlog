const formatTime = (val) => {
  const date = new Date(val);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const h = date.getHours() + ":";
  const m = date.getMinutes();
  return Y + M + D + " " + h + m;
};

export { formatTime };
