const handleScroll = (
  { target: { scrollHeight, scrollTop, clientHeight } },
  setPageHandler
) => {
  const shouldUpdate = scrollHeight - Math.ceil(scrollTop) <= clientHeight;
  // console.log(scrollHeight - scrollTop);
  // console.log(clientHeight);
  if (!shouldUpdate) {
    return;
  }
  setPageHandler((prevPage) => {
    return prevPage + 1;
  });
};

export default handleScroll;
