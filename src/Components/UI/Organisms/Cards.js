import React, { useContext, useEffect, useState } from "react";
import Text from "./../atoms/Text";
import AnimeContext from "./../../../AnimeContext";
import styled from "styled-components";
import Card from "./../molecules/Card";


const CardGrid = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        @media (max-width: 768px){
            grid-template-columns: 1fr;
        }
    `;
const loadingStyle = {
    textAlign: "center",
    marginTop: "5rem"
}
function Cards() {
    const [animeName] = useContext(AnimeContext);
    const [urli, setUrl] = useState("");

    const [arrayOfCards, setCardsDisplayed] = useState();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
           
            setUrl(`https://api.jikan.moe/v3/search/anime?q=${animeName}&limit=12`);
            let response = await fetch(urli);
            let data = await response.json();
            let results = await data.results;
            results.length > 0 ? setIsLoading(false) : setIsLoading(true)
            setCardsDisplayed(results.map(
                animeObject => <Card
                    key={animeObject.mal_id}
                    cardTitle={animeObject.title}
                    img={animeObject.image_url}
                    synopsis={animeObject.synopsis}
                    episodes={animeObject.episodes}
                    animeUrl={animeObject.url}
                    score={animeObject.score}
                    type={animeObject.type}
                    rated={animeObject.rated}
                />)
            );

            
            return(() => {
                setCardsDisplayed([]);
                results = [];
            })
            
        }

        fetchData();
        



        

    }, [animeName, urli]);



    return (

        <div>
            <Text path="/text" type="resultText" value={`Search results for ${animeName}`} />
            {isLoading && animeName !== "" && <h1 style = {loadingStyle}>Loading...</h1>}
            <CardGrid path="/" >

                {
                    arrayOfCards
                }


            </CardGrid>

        </div>
    );

}
export default Cards;