document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Hidden Timestamp Field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }

    // 2. Handle Membership Level Benefit Modals
    const benefitBtns = document.querySelectorAll('.benefit-btn');
    const closeBtns = document.querySelectorAll('.close-modal');

    benefitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.showModal();
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking backdrop outside the dialog box
    const dialogs = document.querySelectorAll('dialog');
    dialogs.forEach(modal => {
        modal.addEventListener('click', (event) => {
            const rect = modal.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                modal.close();
            }
        });
    });
});
