const PageHeader = ({
    title,
    catchphrase,
}: {
    title: string;
    catchphrase: string;
}) => {
    return (
        <div>
            <h1 className="font-semibold">{title}</h1>
            <p className="text-sm font-light">{catchphrase}</p>
        </div>
    );
};

export default PageHeader;
