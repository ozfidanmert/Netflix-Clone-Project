import { onAuthStateChanged } from "firebase/auth";
import { createContext, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { toast } from 'react-toastify'


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const TvPageFromUrl = useCallback(() => {
        const segments = pathname.split('/'); 
    
        const pageSegment = segments[segments.length - 1]; 
        const page = Number(pageSegment);
    
        return !isNaN(page) && page > 0 ? page : 1;
    }, [pathname]);

    const MoviePageFromUrl = useCallback(() => {
        const segments = pathname.split('/'); 
    
        const pageSegment = segments[segments.length - 1]; 
        const page = Number(pageSegment);
    
        return !isNaN(page) && page > 0 ? page : 1;
    }, [pathname]);
    


    const [loading, setLoading] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const [dataCredit, setDataCredit] = useState([])
    const [dataVideo, setDataVideo] = useState([])
    const [discover, setDiscover] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [sortBy, setSortBy] = useState('popularity.desc')
    const [tvActivePage, setTvActivePage] = useState(TvPageFromUrl())
    const [movieActivePage, setMovieActivePage] = useState(MoviePageFromUrl())
    const [searchActivePage, setSearchActivePage] = useState(1)
    const [popularListActivePage, setPopularListActivePage] = useState(1)
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState([])
    const [watchList, setWatchList] = useState([])
    const [selectedMovieGenres, setSelectedMovieGenres] = useState([]);
    const [selectedTvGenres, setSelectedTvGenres] = useState([]);



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser);

            if (!currentUser) {
                navigate('/tr'); // Oturumu olmayan kullanıcıyı yönlendir
            } else {
                getData(currentUser.uid); // Kullanıcı varsa veriyi çek
            }

        });

        return () => unsubscribe(); // Cleanup fonksiyonu

    }, []);


    const fetchWatchList = async () => {

        const userId = auth?.currentUser?.uid
        const q = query(collection(db, "watchlist"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q)

        const items = []
        querySnapshot.forEach((doc) => {
            items.push(doc.data())
        })

        setWatchList(items)
        console.log("items: ", watchList)
    }


    const removeWatchlist = async (itemId) => {

        try {
            const userId = auth.currentUser?.uid
            const watchListRef = doc(db, "watchlist", `${userId}_${itemId}`)

            const docSnapshot = await getDoc(watchListRef)
            if (!docSnapshot.exists) {
                toast.error("Bu öğe izleme listesinde bulunmuyor!")
                return;
            }

            await deleteDoc(watchListRef)
            toast.success("İzleme listesinden kaldırıldı!")
            fetchWatchList()

        } catch (error) {
            console.error(error)
            toast.error("İzleme listesinden kaldırılırken bir hata oluştu")
        }

    }

    useEffect(() => {
        fetchWatchList()
    }, [auth.currentUser])



    const getData = async (userId) => {
        setLoading(true);
        try {
            const q = query(collection(db, 'user'), where("uid", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setUserInfo(userData);
                console.log(userInfo)
            } else {
                console.log("Kullanıcı verisi bulunamadı");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false); // Yükleme durumunu kapat
        }
    };



    // İzleme listesine (favorilere) ekler
    const addWatchList = async (itemId, itemType, itemName, itemTitle, itemDate, itemReleaseDate, itemAverage, itemPoster) => {
        const userId = auth.currentUser?.uid
        if (!userId) {
            toast.error("Lütfen önce giriş yapınız!")
            return;
        }
        try {
            const watchListRef = doc(db, "watchlist", `${userId}_${itemId}`)
            const newItemName = itemName ? itemName : itemTitle
            const newDate = itemDate ? itemDate : itemReleaseDate

            const docSnapshot = await getDoc(watchListRef)
            if (docSnapshot.exists()) {
                toast.error(`(${newItemName}) daha önce izleme listene eklenmiş!`);
                return;
            }

            await setDoc(watchListRef, {
                createAt: serverTimestamp(),
                userId: userId,
                watchId: itemId,
                type: itemType,
                name: newItemName,
                date: newDate,
                average: itemAverage,
                poster: itemPoster
            })
            toast.success(`(${newItemName}) izleme listene eklendi!`)
            fetchWatchList()
        } catch (error) {
            console.error(error)
            toast.error("İzleme listene eklerken bir hata oluştu")
        }
    }

    // Favori listesinde olup olmadığını kontrol et
    const isItemInWatchList = (itemId) => {
        return watchList.some((listItem) => listItem.watchId === itemId)
    }





    const value = {
        user,
        userInfo, setUserInfo,
        dataDetail, setDataDetail, navigate,
        dataCredit, setDataCredit,
        dataVideo, setDataVideo,
        discover, setDiscover,
        sortBy, setSortBy,
        tvActivePage, setTvActivePage,
        movieActivePage, setMovieActivePage,
        loading, setLoading,
        watchList, setWatchList,
        fetchWatchList, removeWatchlist,
        isItemInWatchList, addWatchList,
        searchValue, setSearchValue,
        searchActivePage, setSearchActivePage,
        popularListActivePage, setPopularListActivePage,
        selectedMovieGenres, setSelectedMovieGenres,
        selectedTvGenres, setSelectedTvGenres,

    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider

