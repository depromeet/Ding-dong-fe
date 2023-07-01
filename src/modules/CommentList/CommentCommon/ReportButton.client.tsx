export const ReportButton = () => {
  const handleReport = async () => {
    // TODO: 신고 로직 추가하기
  };

  return (
    <>
      <button className="text-detail text-grey-400" onClick={() => handleReport()}>
        신고
      </button>
    </>
  );
};
