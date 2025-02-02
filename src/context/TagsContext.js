import React, { createContext, useContext, useState } from 'react';

// Tworzymy kontekst z domyślną wartością (pustą tablicą tagów)
const TagsContext = createContext([]);

// Provider, który będzie udostępniał tagi
export const TagsProvider = ({ children }) => {
    const [tags, setTags] = useState([]); // Stan przechowujący tagi

    // Funkcja do aktualizacji tagów
    const setTagsList = (newTags) => {
        setTags(newTags);
    };

    return (
        <TagsContext.Provider value={{ tags, setTagsList }}>
            {children}
        </TagsContext.Provider>
    );
};

// Hook do łatwego dostępu do kontekstu
export const useTags = () => {
    return useContext(TagsContext);
};
