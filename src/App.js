import "./App.css";
import React, { useEffect, useState } from "react";

const VALUE_SUITS = ["♦️", "♣️", "❤️", "♠️"];

const VALUE_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "K", "Q", "J", "A"];

function App() {
  const [unPlayedCards, setUnPlayedCards] = useState([]);
  const [cardError, setCardError] = useState("");
  const [finalPlayCards, setFinalPlayCards] = useState([]);

  useEffect(() => {
    generateCards();
  }, []);

  const generateCards = () => {
    // Generating all cards
    let currentCards = [];
    for (let i = 0; i < VALUE_SUITS.length; i++) {
      for (let j = 0; j < VALUE_NUMBERS.length; j++) {
        currentCards.push({
          cardValue: VALUE_NUMBERS[j],
          cardSymbol: VALUE_SUITS[i],
          color: VALUE_SUITS[i] === "❤️" || VALUE_SUITS[i] === "♦️" ? "red" : "black",
        });
      }
    }
    setUnPlayedCards(currentCards);
  };

  const drawCard = () => {
    let newCard = [];
    let copyUnplayedCards = [...unPlayedCards];
    let length = unPlayedCards.length;

    if (length <= 0) {
      // Setting error if no cards present
      setCardError("No Cards is Present to display.Please Refresh and Draw a New cards");
      return;
    } else if (length === 2) {
      // If two cards remaining then need to push at end of the grid
      newCard.push(...copyUnplayedCards);
      copyUnplayedCards = [];
      length = 0;
    } else if (length > 5) {
      for (let i = 0; i < 5; i++) {
        let spliceIndex = Math.floor(Math.random() * length);
        let splicedItem = copyUnplayedCards.splice(spliceIndex, 1)[0];
        newCard.push(splicedItem);
        // Once Item removed from unplayedcards need to reduce length
        length--;
      }
    }
    setUnPlayedCards(copyUnplayedCards);
    const allCards = [...finalPlayCards, newCard];
    setFinalPlayCards(allCards);
  };

  return (
    <div className='App'>
      <div className='WrapperContainer'>
        <button onClick={drawCard}>Draw card</button>
        <div className='cardError'>{cardError && cardError}</div>
        <div className='cardWrapper'>
          {finalPlayCards.map((singleCardSection) => {
            return (
              <div className='cardContainer'>
                {singleCardSection.map((card, index) => {
                  return (
                    <div key={index} className='cardSection'>
                      <div style={{ color: card.color }} className='cardValue'>
                        {card.cardValue}
                      </div>
                      <div style={{ color: card.color }} className='cardSymbol'>
                        <div>{card.cardSymbol}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
