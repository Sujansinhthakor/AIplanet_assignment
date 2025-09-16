const PrimaryButton = ({ icon, text, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="flex gap-1 justify-between items-center py-[8px] px-[10px] bg-[#44924C] text-sm w-fit text-white rounded-[8px] cursor-pointer hover:opacity-90"
      >
        <div>{icon}</div>
        <div className="font-semibold">{text}</div>
      </div>
    </>
  );
};
export default PrimaryButton;
