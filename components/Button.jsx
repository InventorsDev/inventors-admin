const Button = ({ children, bgRedBtn = false, mintGreenBtn = false, primaryButton = false, dangerButton = false, className, buttonProps }) => {
  return (
    <button
      className={`${className} ease-transition active:scale-[95%] rounded-lg py-3 px-4 ${mintGreenBtn
        ? 'bg-mintGreen text-primaryGreen'
        : primaryButton
          ? 'bg-primaryGreen text-white'
          : dangerButton
            ? 'text-[#AA0010]  bg-red-100 bg-transparent border border-[#AA0010]'
            : bgRedBtn
              ? 'bg-red-100 border-none text-red-500' 
              :'bg-white text-[#344054] border border-[#D0D5DD]'
        }`}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default Button