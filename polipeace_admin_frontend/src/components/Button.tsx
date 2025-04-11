interface ButtonProps {
  width: number,
  height: number,
  text: string,
  color: string,
  backgroundColor: string,
  borderRadius: string,
  paddingTop: number,
  border: string,
  onClick?: ()=>void,
  onMouseEnter: ()=> void,
  onMouseLeave: ()=> void
}


export default function Button({width, height, text, color, backgroundColor, borderRadius, onClick, paddingTop, border, onMouseEnter,onMouseLeave}: ButtonProps) {


  return (
    <div style={{
      width: width,
      height: height,
      color: color,
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      paddingTop: paddingTop,
      border: border,
      textAlign:'center',
      cursor:'pointer',
      transition:'all 0.3s ease-in'
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={()=> onClick}
    
    >
      {text}
    </div>
  )
}
