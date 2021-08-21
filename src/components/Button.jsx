function Btn({ variant, content, iconLeft, handleClick, style, type, form }) {
  return (
    <button
      className={variant}
      onClick={handleClick}
      style={style}
      type={type}
      form={form}
    >
      {iconLeft}
      {content}
    </button>
  );
}

export default Btn;
