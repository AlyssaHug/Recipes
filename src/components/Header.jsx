export default function Header() {
    return (
        <header className='header'>
            <div className='header-content'>
                <h1 className='title'>Recipes Catalog 🥗</h1>
                <p>
                    <span>Members:</span> Alyssa, Angie, Thea, Sandy
                </p>
            </div>
            <img
                className='header-img'
                src='https://img.freepik.com/premium-vector/set-coffee-equipment_73637-503.jpg'
                alt='header-img-decor'
            />
        </header>
    );
}
