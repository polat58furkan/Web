function toggleButton() 
{
    const menu=document.getElementById('toggleButton')
    if (menu.style.display === 'none' || menu.style.display === '') 
    {
        menu.style.display = 'flex'; // Görünür yap
    } 
    else 
    {
        menu.style.display = 'none'; // Gizle
    }
}

function PageUpdate()
{
    const menu=document.getElementById('toggleButton')
    const left_link=document.getElementById('leftLink')
    const right_link=document.getElementById('rightLink')

    // Inputların değerlerini al
    const leftValue = left_link.value.trim();
    const rightValue = right_link.value.trim();
    console.log(leftValue,rightValue)
    // Frame kaynaklarına ekle 
    const left_frame_link=document.getElementById('leftFrame')
    const right_frame_link=document.getElementById('rightFrame')
    if ( leftValue === '' && rightValue === '')
    {
        alert("Link vermediniz")
        menu.style.display = 'flex';
    } else 
    {
        if ( leftValue != '')
        {
            left_frame_link.src=leftValue;
        }
        if ( rightValue != '')
        {
            right_frame_link.src=rightValue;
        }
        menu.style.display = 'none';
    }

}
function Reset()
{
    const menu=document.getElementById('toggleButton')
    // Inputların değerleri
    const left_frame_link=document.getElementById('leftLink')
    const right_frame_link=document.getElementById('rightLink')

    const a =document.getElementById('leftFrame')
    const b =document.getElementById('rightFrame')
    a.src="";
    a.src="";

    left_frame_link.value='';
    right_frame_link.value='';

}