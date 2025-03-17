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
            <p className="text-sm font-normal">{catchphrase}</p>
        </div>
    );
};

export default PageHeader;
