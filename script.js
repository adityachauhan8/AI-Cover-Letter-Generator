document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('coverLetterForm');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const letterPreview = document.getElementById('letterPreview');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        generateCoverLetter();
    });

    downloadBtn.addEventListener('click', downloadLetter);
    copyBtn.addEventListener('click', copyToClipboard);

    function generateCoverLetter() {
        const fullName = document.getElementById('fullName').value.trim();
        const jobTitle = document.getElementById('jobTitle').value.trim();
        const companyName = document.getElementById('companyName').value.trim();

        if (!fullName || !jobTitle || !companyName) {
            showError('Please fill in all required fields');
            return;
        }

        generateBtn.disabled = true;
        loadingIndicator.style.display = 'block';
        errorMessage.style.display = 'none';

        setTimeout(() => {
            const letter = createLetter();
            letterPreview.innerHTML = letter;

            generateBtn.disabled = false;
            loadingIndicator.style.display = 'none';
            downloadBtn.disabled = false;
            copyBtn.disabled = false;

            showSuccess('Cover letter generated successfully!');
        }, 1500);
    }

    function createLetter() {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const jobTitle = document.getElementById('jobTitle').value.trim();
        const companyName = document.getElementById('companyName').value.trim();
        const hiringManager = document.getElementById('hiringManager').value.trim();
        const jobLocation = document.getElementById('jobLocation').value.trim();
        const skills = document.getElementById('skills').value.trim();
        const experience = document.getElementById('experience').value;
        const achievements = document.getElementById('achievements').value.trim();
        const connection = document.getElementById('connection').value.trim();

        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const salutation = hiringManager ? `Dear ${hiringManager},` : 'Dear Hiring Manager,';

        let letterContent = `
            <div class="date">${formattedDate}</div>
            <div class="recipient">
                ${hiringManager || 'Hiring Manager'}<br>
                ${companyName}<br>
                ${jobLocation || ''}
            </div>
            <div class="salutation">${salutation}</div>
            <p>I am excited to apply for the ${jobTitle} position at ${companyName}. With ${
                experience === '0-1' ? 'my recent training and education' :
                experience === '1-3' ? `${experience.split('-')[1]} years of experience` :
                experience === '3-5' ? `${experience.split('-')[1]} years of professional experience` :
                'extensive experience'
            } in ${skills ? skills.split(',').slice(0, 2).join(' and ') : 'this field'}, I am confident in my ability to contribute effectively to your team.</p>
            ${achievements ? `<p>In my ${experience ? 'current role' : 'experience'}, I have achieved notable successes including: ${achievements}.</p>` : ''}
            ${connection ? `<p>${connection}</p>` : ''}
            <p>My skills in ${skills || 'the required areas'} align well with the requirements for this position. I am particularly excited about the opportunity to ${
                jobTitle.toLowerCase().includes('manager') ? 'lead teams and drive organizational success' :
                jobTitle.toLowerCase().includes('engineer') ? 'solve complex technical challenges' :
                jobTitle.toLowerCase().includes('designer') ? 'create innovative solutions' :
                'contribute my expertise'
            } at ${companyName}.</p>
            <p>I would welcome the opportunity to discuss how my background, skills, and enthusiasm would make me a valuable addition to ${companyName}. Thank you for your time and consideration. I look forward to the possibility of contributing to your team.</p>
            <div class="signature">
                <p>Sincerely,</p>
                <p>${fullName}</p>
                ${email ? `<p>${email}</p>` : ''}
                ${phone ? `<p>${phone}</p>` : ''}
                ${address ? `<p>${address}</p>` : ''}
            </div>
        `;

        return letterContent;
    }

    function downloadLetter() {
        showSuccess('Downloading cover letter as PDF... (simulated)');
        // For real PDF, use jsPDF or html2pdf
    }

    function copyToClipboard() {
        const text = letterPreview.innerText;
        navigator.clipboard.writeText(text)
            .then(() => showSuccess('Cover letter copied to clipboard!'))
            .catch(() => showError('Failed to copy text. Please try again.'));
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }

    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});
