import  { useEffect } from "react";
import "./TopButton.css";

interface TopButtonProps {
    theme: {
        body: string;
        text: string;
    };
}

function TopButton({ theme }: TopButtonProps) {
    const handleClick = () => {
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
    };

    const scrollFunction = () => {
        const topButton = document.getElementById("topButton");
        if (topButton) {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                topButton.style.visibility = "visible";
            } 
            else {
                topButton.style.visibility = "hidden";
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollFunction);
        return () => {
            window.removeEventListener("scroll", scrollFunction);
        };
    }, []);

    const onMouseEnter = (color: string, bgColor: string) => {
        const topButton = document.getElementById("topButton");
        if (topButton) {
            topButton.style.color = color;
            topButton.style.backgroundColor = bgColor;
            const arrow = document.getElementById("arrow");
            if (arrow) {
                arrow.style.color = color;
                arrow.style.backgroundColor = bgColor;
            }
        }
    };

    const onMouseLeave = (color: string, bgColor: string) => {
        const topButton = document.getElementById("topButton");
        if (topButton) {
            topButton.style.color = color;
            topButton.style.backgroundColor = bgColor;
            const arrow = document.getElementById("arrow");
            if (arrow) {
                arrow.style.color = color;
                arrow.style.backgroundColor = bgColor;
            }
        }
    };

    return (
        <div
            onClick={handleClick}
            id="topButton"
            style={{
                color: theme.body,
                backgroundColor: theme.text,
                border: `solid 1px ${theme.text}`,
            }}
            title="Sell"
            onMouseEnter={() => onMouseEnter(theme.text, theme.body)}
            onMouseLeave={() => onMouseLeave(theme.body, theme.text)}
        >
            <a href="/sell" id="arrow">
                <i className="fa-solid fa-plus"></i>
            </a>
            
        </div>
    );
}

export default TopButton;
