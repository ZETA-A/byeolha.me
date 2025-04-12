const PageHeader = ({
    title,
    catchphrase,
}: {
    title: string;
    catchphrase: string;
}) => {
    return (
        <div>
            <h2 className="font-bold">{title}</h2>
            <p className="text-base text-second">{catchphrase}</p>
        </div>
    );
};

export default PageHeader;
