document.addEventListener('DOMContentLoaded', function() {
    const jobData = [
        {
          "id": 1,
          "company": "Photosnap",
          "logo": "./images/photosnap.svg",
          "new": true,
          "featured": true,
          "position": "Senior Frontend Developer",
          "role": "Frontend",
          "level": "Senior",
          "postedAt": "1d ago",
          "contract": "Full Time",
          "location": "USA Only",
          "languages": ["HTML", "CSS", "JavaScript"],
          "tools": []
        },
        {
          "id": 2,
          "company": "Manage",
          "logo": "./images/manage.svg",
          "new": true,
          "featured": true,
          "position": "Fullstack Developer",
          "role": "Fullstack",
          "level": "Midweight",
          "postedAt": "1d ago",
          "contract": "Part Time",
          "location": "Remote",
          "languages": ["Python"],
          "tools": ["React"]
        },
        {
          "id": 3,
          "company": "Account",
          "logo": "./images/account.svg",
          "new": true,
          "featured": false,
          "position": "Junior Frontend Developer",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "2d ago",
          "contract": "Part Time",
          "location": "USA Only",
          "languages": ["JavaScript"],
          "tools": ["React", "Sass"]
        },
        {
          "id": 4,
          "company": "MyHome",
          "logo": "./images/myhome.svg",
          "new": false,
          "featured": false,
          "position": "Junior Frontend Developer",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "5d ago",
          "contract": "Contract",
          "location": "USA Only",
          "languages": ["CSS", "JavaScript"],
          "tools": []
        },
        {
          "id": 5,
          "company": "Loop Studios",
          "logo": "./images/loop-studios.svg",
          "new": false,
          "featured": false,
          "position": "Software Engineer",
          "role": "Fullstack",
          "level": "Midweight",
          "postedAt": "1w ago",
          "contract": "Full Time",
          "location": "Worldwide",
          "languages": ["JavaScript", "Ruby"],
          "tools": ["Sass"]
        },
        {
          "id": 6,
          "company": "FaceIt",
          "logo": "./images/faceit.svg",
          "new": false,
          "featured": false,
          "position": "Junior Backend Developer",
          "role": "Backend",
          "level": "Junior",
          "postedAt": "2w ago",
          "contract": "Full Time",
          "location": "UK Only",
          "languages": ["Ruby"],
          "tools": ["RoR"]
        },
        {
          "id": 7,
          "company": "Shortly",
          "logo": "./images/shortly.svg",
          "new": false,
          "featured": false,
          "position": "Junior Developer",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "2w ago",
          "contract": "Full Time",
          "location": "Worldwide",
          "languages": ["HTML", "JavaScript"],
          "tools": ["Sass"]
        },
        {
          "id": 8,
          "company": "Insure",
          "logo": "./images/insure.svg",
          "new": false,
          "featured": false,
          "position": "Junior Frontend Developer",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "2w ago",
          "contract": "Full Time",
          "location": "USA Only",
          "languages": ["JavaScript"],
          "tools": ["Vue", "Sass"]
        },
        {
          "id": 9,
          "company": "Eyecam Co.",
          "logo": "./images/eyecam-co.svg",
          "new": false,
          "featured": false,
          "position": "Full Stack Engineer",
          "role": "Fullstack",
          "level": "Midweight",
          "postedAt": "3w ago",
          "contract": "Full Time",
          "location": "Worldwide",
          "languages": ["JavaScript", "Python"],
          "tools": ["Django"]
        },
        {
          "id": 10,
          "company": "The Air Filter Company",
          "logo": "./images/the-air-filter-company.svg",
          "new": false,
          "featured": false,
          "position": "Front-end Dev",
          "role": "Frontend",
          "level": "Junior",
          "postedAt": "1mo ago",
          "contract": "Part Time",
          "location": "Worldwide",
          "languages": ["JavaScript"],
          "tools": ["React", "Sass"]
        }
      ];
       
      const jobList = document.getElementById('job-list');
      const filterContainer = document.getElementById('filter-container');
      let selectedFilters = [];

      const renderJobs = (jobs) => {
        jobList.innerHTML = '';
        jobs.forEach(job => {
          const jobCard = document.createElement('div');
          jobCard.classList.add('job-card');

          if (job.featured) {
            jobCard.classList.add('featured');
          }

          jobCard.innerHTML = `
            <div class="job-card-header">
              <img src="${job.logo}" alt="${job.company} Logo" class="company-logo">
              <div class="job-info">
                <div class="tags">
                  <span class="tag company-name">${job.company}</span>
                  ${job.new ? '<span class="tag new">NEW!</span>' : ''}
                  ${job.featured ? '<span class="tag featured">FEATURED</span>' : ''}
                </div>
                <h2>${job.position}</h2>
                <p>${job.postedAt} · ${job.contract} · ${job.location}</p>
              </div>
            </div>
            <div class="job-tablets">
              <span class="tablet">${job.role}</span>
              <span class="tablet">${job.level}</span>
              ${job.languages.map(language => `<span class="tablet">${language}</span>`).join('')}
              ${job.tools.map(tool => `<span class="tablet">${tool}</span>`).join('')}
            </div>
          `;

          jobList.appendChild(jobCard);

          jobCard.querySelectorAll('.tablet').forEach(tablet => {
            tablet.addEventListener('click', () => {
              addFilter(tablet.textContent);
            });
          });
        });
      };

      const addFilter = (filter) => {
        if (!selectedFilters.includes(filter)) {
          selectedFilters.push(filter);
          updateFilters();
        }
      };

      const removeFilter = (filter) => {
        selectedFilters = selectedFilters.filter(f => f !== filter);
        updateFilters();
      };

      const updateFilters = () => {
        filterContainer.innerHTML = '';
        selectedFilters.forEach(filter => {
          const filterElement = document.createElement('div');
          filterElement.classList.add('filter');
          filterElement.innerHTML = `
            ${filter}
            <span class="remove-filter">x</span>
          `;

          filterElement.querySelector('.remove-filter').addEventListener('click', () => {
            removeFilter(filter);
          });

          filterContainer.appendChild(filterElement);
        });

        const filteredJobs = jobData.filter(job => {
          const jobTablets = [
            job.role,
            job.level,
            ...job.languages,
            ...job.tools
          ];
          return selectedFilters.every(filter => jobTablets.includes(filter));
        });

        renderJobs(filteredJobs);
      };

      renderJobs(jobData);
    });