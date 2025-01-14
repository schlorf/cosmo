const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));

faqItems.forEach((item) => {
    const onClick = () => {
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle the current item's active state
        item.classList.toggle('active');
    };

    item.addEventListener('click', onClick);
});
