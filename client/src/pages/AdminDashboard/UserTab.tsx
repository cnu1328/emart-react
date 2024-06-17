import { Button } from "../../ui-library/button";

type TabProps = {
    options: Array<{ id: number;  title: string}>;
    activeTab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tab({ options, activeTab, setTab} : TabProps) {

    return(
        <div
            style={{
                display: "flex",
                alignItems: "center",
                height: "30px",
                borderBottom: "solid 1px rgba(242, 242, 242, 1)",
                gap: "8px",
                width: "100%",
                marginLeft: "auto",
                marginBottom: "12px",
                overflowX: "auto"
            }}
        >
            {options.map((option) => {
                return (
                    <Button
                        onClick={() => setTab(option.title)}
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
                            width: "60px",
                        }}
                        key={option.id}
                    >
                        {option.title}
                    </Button>
                );
            })}

        </div>
    );
}