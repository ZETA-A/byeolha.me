const PageHeader = ({
    title,
    catchphrase,
}: {
    title: string;
    catchphrase: string;
}) => {
    return (
        <div>
            <h1 className="font-bold">{title}</h1>
            <p className="text-base text-second font-light">{catchphrase}</p>
        </div>
    );
};

export default PageHeader;
