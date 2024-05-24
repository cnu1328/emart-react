import { Link } from "react-router-dom";

type TabProps = {
    options: Array<{ id: number; url: string; title: string}>;
    activeTab: string;
}

export default function Tab({ options, activeTab} : TabProps) {

    return(
        <div
            style={{
                display: "flex",
                alignItems: "center",
                height: "30px",
                borderBottom: "solid 1px rgba(242, 242, 242, 1)",
                gap: "28px",
                width: "100%",
                marginLeft: "auto",
                marginBottom: "12px",
                overflowX: "auto"
            }}
        >
            {options.map((option) => {
                return (
                    <Link
                        to={`${option.url}`}
                        style={{
                            textDecoration: "none",
                            color: activeTab === option.title ? "black" : "gray",
                            fontSize: "14px",
                            fontFamily: "Questrial",
                            whiteSpace: "nowrap",
                            borderBottom:
                                activeTab === option.title ? "2px solid black" : "none",
                            height: activeTab === option.title ? "96%" : "98%",
                            zIndex: "99",
                            padding: "0 4px",
                        }}
                        key={option.id}
                    >
                        {option.title}
                    </Link>
                );
            })}

        </div>
    );
}