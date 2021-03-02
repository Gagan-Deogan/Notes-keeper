import React,{useState , useEffect} from 'react'
import {AddNotes} from '../Form/AddNotes'
import {SearchBar} from './SearchBar'
// import {NotesCard} from './NotesCard'
export const Home = () => {
    const [serachBy,setSearchBy] = useState('')
    const [cardsDetails,setCardDetails] = useState(()=>{
        const notes = window.localStorage.getItem('notes')
        if(!!!notes){
            window.localStorage.setItem('notes',[]);
            return [];
        }else {
            return JSON.parse(notes);
        }
    });
    const reducer = (currentVal,item)=>{
        const reg = new RegExp(`${serachBy}`,'i');
        let isinclude = false; 
        for(let i = 0 ; i < item['labels'].length ; i++){
            if(reg.test(item['labels'][i])){
                isinclude = true;
                break;
            }
        }
        return currentVal = isinclude ? [...currentVal,item['id']] : [...currentVal]
    }
    const pinReduce = (currentVal,item)=>{
        return currentVal = item['pin'] ? [...currentVal,item['id']] : [...currentVal]
    }
    const [onlyPin,setOnlyPin] = useState(false);
    const [filterIds, setFilterIds] = useState([]);
    const filterTheList = () => {
        if(serachBy.length){
            const filterLabels = cardsDetails.reduce(reducer,[])
            setFilterIds([...filterLabels])
        }else if(onlyPin){
            const filterLabels = cardsDetails.reduce(pinReduce,[])
            setFilterIds([...filterLabels])
        }else{
            setFilterIds([]);   
        }
    }
    const handleRemNote = (id) =>{
        setCardDetails((prev)=>{
            const next = prev.filter((item) => item['id'] === id ? false : true )
            return next;
        });
    }
    useEffect(filterTheList,[serachBy, cardsDetails , onlyPin])
    useEffect(()=>{
        window.localStorage.setItem('notes',JSON.stringify(cardsDetails));
    },[cardsDetails])

    return (
        <div className='dis-flx dir-col alg-itm w100 jst-ctr mrg-t-16'>
            <AddNotes setCardDetails={ setCardDetails } />
            {/* serach bar */}
            <SearchBar serachBy={serachBy} setSearchBy={setSearchBy} onlyPin={onlyPin} setOnlyPin={setOnlyPin} />
            {/* cardss */}
            <section className='dis-flx flx-warp card-cont jst-spa-bet '>
                {cardsDetails.map((note) => (
                    filterIds.length ? filterIds.includes(note['id']) && (<AddNotes data = { note } setCardDetails ={setCardDetails } handleRemNote={handleRemNote} key={note['id']} />) : (<AddNotes data = { note } setCardDetails ={setCardDetails } handleRemNote={handleRemNote} key={note['id']} />)
                ))}
            </section>
        </div>
    )
}

