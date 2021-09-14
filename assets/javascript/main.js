const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const activitiesAPI = 'https://maithiyenlinh.github.io/time-tracking-dashboard/data.json';



const listActivities = $('#time .row');
const listTimeFrames = $('#timeframes ul');

app = {

    renderTime(data) {
        const periodName = $('.active').innerText.toLowerCase();
        let text;
        switch(periodName) {
            case 'daily':
                text = 'Yesterday';
                break;
            case 'weekly':
                text = 'Last Week';
                break;
            case 'monthly':
                text = 'Last Month';
                break;
        };
        let html = data.map(function(activity) {

            return `
                <div class="col l-4 m-6 c-12">

                    <div class="activity-item">
                        <div id="${activity['title'].split(' ')[0].toLowerCase()}" class="item-background above"></div>

                        <div class="item-information bottom">

                            <div class="item-name">
                                ${activity['title']}
                                <img class="icon" src="./images/icon-ellipsis.svg" alt="icon-more">
                            </div>

                            <div class="item-current-time">
                                ${activity['timeframes'][periodName]['current']}hrs
                            </div>

                            <div class="item-previous-time">
                                ${text} - ${activity['timeframes'][periodName]['previous']}hrs
                            </div>

                        </div>

                        <div class="item-overlay bottom">
                            <img class="icon" src="./images/icon-ellipsis.svg" alt="icon-more">
                        </div>  

                    </div>

                </div>
            `
        });
        listActivities.innerHTML = html.join('');

        // handle click get overlay around time block
        const itemsInfor = $$('.item-information');
        itemsInfor.forEach(function(item) {
        
            item.onmouseover = item.nextElementSibling.onmouseleave = handle;

            function handle(e) {
                const option = e.target.closest('.icon');
                
                if(option) {
                    item.nextElementSibling.style.display = 'none';
                } else {
                    if(e.type == 'mouseover') {
                        item.nextElementSibling.style.display = 'block';
                    } else if (e.type == 'mouseleave') {
                        item.nextElementSibling.style.display = 'none';
                    }
                }
            }
        });
    },
    getActivities() {
        fetch(activitiesAPI)
            .then(response => response.json())
            .then(data => this.renderTime(data))
            .catch(err => alert('Erorr: ',err));
    }, 

    handleEventClick() {
        listTimeFrames.onclick = (e) => {
            if (e.target.className === '') {
                $('.active').classList.remove('active');
                e.target.classList.add('active');
                this.getActivities()
            };
        };
    },

    start() {
        this.getActivities();

        this.handleEventClick();
    }
}

app.start();

