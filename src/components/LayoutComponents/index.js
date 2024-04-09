import './styles.css';

export const LayoutComponents = (props) => {
    return(
        <div className='conteiner'>
            <div className='conteinerLogin'>
                <div className='login'>
                    {props.children}
        
                </div>    
            </div>
        </div>
    )
    
}