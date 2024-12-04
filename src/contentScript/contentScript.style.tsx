const contentScriptStyles = () => {

    const styles = {
        itemContainer:{
           position: 'fixed' as 'fixed',
           left: '5%',
           top: '15%',
           maxWidth: '240px',
           maxHeight: '240px',
           backgroundColor: '#f5f5f5',
           zIndex: '9999'
        }
    }
    return styles
}

export default contentScriptStyles;