const Button = ({ children, mintGreenBtn = false, primaryButton = false, dangerButton = false, className, buttonProps }) => {
  return (
    <button
      className={`${className} rounded-lg py-3 px-4 ${mintGreenBtn
        ? 'bg-mintGreen text-primaryGreen'
        : primaryButton
          ? 'bg-primaryGreen text-white'
          : dangerButton
            ? 'text-[#AA0010] bg-transparent border border-[#AA0010]'
            : 'bg-white text-[#344054] border border-[#D0D5DD]'
        }`}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default Button