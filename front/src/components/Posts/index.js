import { LanguageContext } from "../../context/language";
import { useContext, useState } from "react";
import CardPosts from '../CardPosts';

export default function Posts({ postList, clickfunc, isComment }) {
    const { text } = useContext(LanguageContext)
    const [isHidden, setIsHidden] = useState(true)
    
    return postList.map((artigo) => {
        return (
            <CardPosts artigo={artigo} clickfunc={clickfunc} isComment={isComment} />
        )
    })
};